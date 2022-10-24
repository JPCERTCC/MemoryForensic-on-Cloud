resource "aws_ecr_repository" "analysis" {
  name                 = var.image_name
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}

resource "null_resource" "docker_build_push" {
  triggers = {
    file1 = "${sha256(file("docker/Dockerfile"))}"
    file2 = "${sha256(file("docker/run.sh"))}"
  }

  provisioner "local-exec" {
    command = <<EOT
  $(aws ecr get-login --no-include-email --region ${var.region})
  docker build -t ${var.image_name} ${var.docker_dir}
  docker tag ${var.image_name}:latest ${aws_ecr_repository.analysis.repository_url}
  docker push ${aws_ecr_repository.analysis.repository_url}:latest
      EOT
    interpreter = ["/bin/bash", "-c"]
    working_dir = path.module
  }
}
