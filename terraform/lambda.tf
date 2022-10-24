data "archive_file" "function_source_all" {
  type        = "zip"
  source_dir  = "Lambda_all"
  output_path = "archive/analysis-func_all.zip"
}

resource "aws_lambda_function" "function_all" {
  function_name = "${local.function_name}_all"
  handler       = "lambda_function_all.lambda_handler"
  memory_size   = "128"
  role          = aws_iam_role.function_role.arn
  runtime       = "python3.8"
  timeout       = "10"

  filename         = data.archive_file.function_source_all.output_path
  source_code_hash = data.archive_file.function_source_all.output_base64sha256

  environment {
    variables = {
      JOB_QUEUE = aws_batch_job_queue.analysis.arn
      JOB_DEFINITION = "${var.app_name}_job"
      S3_BUCKET = aws_s3_bucket_website_configuration.analysis.website_endpoint
    }
  }

  tracing_config {
    mode = "PassThrough"
  }

  depends_on = [aws_iam_role_policy_attachment.lambda_policy, aws_cloudwatch_log_group.lambda_log_group_all]
}

resource "aws_cloudwatch_log_group" "lambda_log_group_all" {
  name = "/aws/lambda/${local.function_name}_all"
}


data "archive_file" "function_source_plugin" {
  type        = "zip"
  source_dir  = "Lambda_plugin"
  output_path = "archive/analysis-func_plugin.zip"
}

resource "aws_lambda_function" "function_plugin" {
  function_name = "${local.function_name}_plugin"
  handler       = "lambda_function_plugin.lambda_handler"
  memory_size   = "128"
  role          = aws_iam_role.function_role.arn
  runtime       = "python3.8"
  timeout       = "10"

  filename         = data.archive_file.function_source_plugin.output_path
  source_code_hash = data.archive_file.function_source_plugin.output_base64sha256

  environment {
    variables = {
      JOB_QUEUE = aws_batch_job_queue.analysis.arn
      JOB_DEFINITION = "${var.app_name}_job"
      S3_BUCKET = aws_s3_bucket_website_configuration.analysis.website_endpoint
    }
  }

  tracing_config {
    mode = "PassThrough"
  }

  depends_on = [aws_iam_role_policy_attachment.lambda_policy, aws_cloudwatch_log_group.lambda_log_group_plugin]
}

resource "aws_cloudwatch_log_group" "lambda_log_group_plugin" {
  name = "/aws/lambda/${local.function_name}_plugin"
}
