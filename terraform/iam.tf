# for Lambda iam policy
data "aws_iam_policy_document" "AWSLambdaTrustPolicy" {
  statement {
    actions = ["sts:AssumeRole"]
    effect  = "Allow"

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "function_role" {
  name               = "${local.name}-lambdaurl-function_role"
  assume_role_policy = data.aws_iam_policy_document.AWSLambdaTrustPolicy.json
}

resource "aws_iam_role_policy_attachment" "lambda_policy" {
  role       = aws_iam_role.function_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_policy" "batch" {
  name        = "${local.name}-batch"

  policy = jsonencode({
    Version: "2012-10-17",
    Statement: [
      {
        Sid: "",
        Action: [
          "batch:SubmitJob"
        ],
        Effect: "Allow",
        Resource: "*",
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda-batch" {
  role       = aws_iam_role.function_role.name
  policy_arn = aws_iam_policy.batch.arn
}



# for Batch iam policy
resource "aws_iam_role" "runner_batch_svc_role" {
  name = "${local.name}-batch-svc-role"

  assume_role_policy = jsonencode({
    Version : "2012-10-17"
    Statement : [
      {
        Action : "sts:AssumeRole"
        Effect : "Allow"
        Principal : {
          Service : "batch.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "runner_batch_svc_role_attach_batch_service_role" {
  role       = aws_iam_role.runner_batch_svc_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSBatchServiceRole"
}

resource "aws_iam_role" "runner_task_exec_role" {
  name = "${local.name}-task-exec-role"
  assume_role_policy = jsonencode({
    Version : "2012-10-17"
    Statement : [
      {
        Action : "sts:AssumeRole"
        Effect : "Allow"
        Principal : {
          Service : "ecs-tasks.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "runner_task_exec_role_attach_ecs_task_exec_role" {
  role       = aws_iam_role.runner_task_exec_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}
