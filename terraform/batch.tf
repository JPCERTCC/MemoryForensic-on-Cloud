resource "aws_batch_job_definition" "analysis" {
    name = "${local.name}_job"
    type = "container"
    platform_capabilities = [
      "FARGATE",
    ]
    container_properties = <<CONTAINER_PROPERTIES
{
    "command": ["echo","hello world"],
    "image": "${aws_ecr_repository.analysis.repository_url}:latest",
    "fargatePlatformConfiguration": {
      "platformVersion": "LATEST"
    },
    "resourceRequirements": [
      {"type": "VCPU", "value": "4"},
      {"type": "MEMORY", "value": "25600"}
    ],
    "environment": [
      {"name": "AWS_ACCESS_KEY_ID", "value": "${var.aws_access_key_id}"},
      {"name": "AWS_SECRET_ACCESS_KEY", "value": "${var.aws_secret_access_key}"},
      {"name": "S3_BUCKET", "value": "${aws_s3_bucket_website_configuration.analysis.website_endpoint}"},
      {"name": "BACKET_NAME", "value": "${local.name}-bucket"},
      {"name": "IMAGE_BACKET_NAME", "value": "${local.name}-memory-bucket"},
      {"name": "REPO_NAME", "value": "${local.name}-repo"},
      {"name": "CODE_REPO", "value": "${aws_codecommit_repository.analysis.clone_url_http}"},
      {"name": "REGION", "value": "${var.region}"},
      {"name": "API_GATEWAY_URL", "value": "${aws_api_gateway_stage.api.invoke_url}/${aws_api_gateway_resource.analysis.path_part}"}
    ],
    "networkConfiguration": {
      "assignPublicIp": "ENABLED"
    },
    "executionRoleArn": "${aws_iam_role.runner_task_exec_role.arn}"
}
CONTAINER_PROPERTIES
}

resource "aws_batch_compute_environment" "analysis" {
  compute_environment_name = "${local.name}_env"
  compute_resources {
    max_vcpus = 16
    security_group_ids = [
      aws_security_group.runner_batch_compute_sg.id
    ]
    subnets = [
      aws_subnet.analysis_subnet.id,
      aws_subnet.analysis_subnet-public.id,
    ]

    type = "FARGATE"
  }
  service_role = aws_iam_role.runner_batch_svc_role.arn
  type = "MANAGED"
  state = "ENABLED"
  depends_on = [aws_iam_role_policy_attachment.runner_batch_svc_role_attach_batch_service_role]
}

resource "aws_batch_job_queue" "analysis" {
  name     = "${local.name}_job_queue"
  state    = "ENABLED"
  priority = 1
  compute_environments = [
    aws_batch_compute_environment.analysis.arn
  ]
}

resource "aws_security_group" "runner_batch_compute_sg" {
  name   = "${local.name}-runner-batch-compute-sg"
  vpc_id = aws_vpc.analysis_subnet.id

  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
  }
}
