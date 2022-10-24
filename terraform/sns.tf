resource "aws_sns_topic" "analysis" {
  name            = "${local.name}_topic"
  delivery_policy = jsonencode({
    "http" : {
      "defaultHealthyRetryPolicy" : {
        "minDelayTarget" : 20,
        "maxDelayTarget" : 20,
        "numRetries" : 3,
        "numMaxDelayRetries" : 0,
        "numNoDelayRetries" : 0,
        "numMinDelayRetries" : 0,
        "backoffFunction" : "linear"
      },
      "disableSubscriptionOverrides" : false,
      "defaultThrottlePolicy" : {
        "maxReceivesPerSecond" : 1
      }
    }
  })
}

resource "aws_sns_topic_subscription" "analysis" {
  topic_arn = aws_sns_topic.analysis.arn
  protocol  = "email"
  endpoint  = var.sns_email
}

resource "aws_sns_topic_policy" "default" {
  arn = aws_sns_topic.analysis.arn

  policy = <<EOF
  {
    "Version": "2012-10-17",
    "Id": "__default_policy_ID",
    "Statement": [
      {
        "Sid": "AWSEvents_smebiz-codepipeline-events_SendToSNS",
        "Effect": "Allow",
        "Principal": {
          "Service": "events.amazonaws.com"
        },
        "Action": "sns:Publish",
        "Resource": "${aws_sns_topic.analysis.arn}"
      }
    ]
  }
EOF
}
