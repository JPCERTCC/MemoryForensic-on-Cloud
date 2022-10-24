# Memory image submit event from S3
resource "aws_cloudwatch_event_rule" "s3-event" {
  name        = "${local.name}_s3-pushevent"

  event_pattern =  <<EOF
  {
    "source": ["aws.s3"],
    "detail-type": ["Object Created"],
    "detail": {
      "bucket": {
        "name": ["${aws_s3_bucket.memory.id}"]
      }
    }
  }
EOF
}

resource "aws_cloudwatch_event_target" "push_event" {
    rule      = aws_cloudwatch_event_rule.s3-event.name
    arn       = aws_lambda_function.function_all.arn
}

resource "aws_lambda_permission" "cloudwatch_event" {
    action        = "lambda:InvokeFunction"
    function_name = aws_lambda_function.function_all.function_name
    principal     = "events.amazonaws.com"
    source_arn    = aws_cloudwatch_event_rule.s3-event.arn
}


# Memory image submit event from S3
resource "aws_cloudwatch_event_rule" "batch-job" {
  name = "${local.name}-batch-job"

  event_pattern = <<EOF
  {
    "source": ["aws.batch"],
    "detail-type": ["Batch Job State Change"],
    "detail": {
      "status": ["FAILED", "SUCCESSED"],
      "jobQueue": ["${aws_batch_job_queue.analysis.arn}"]
    }
  }
EOF
}

resource "aws_cloudwatch_event_target" "sns" {
  rule = aws_cloudwatch_event_rule.batch-job.name
  arn  = aws_sns_topic.analysis.arn

  input_transformer {
    input_paths = {
      status   = "$.detail.status",
      jobName  = "$.detail.jobName",

    }
    input_template = "\"Memory analysis job <status> (Job name: <jobName>)\""
  }
}
