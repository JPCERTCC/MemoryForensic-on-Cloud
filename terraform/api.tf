resource "aws_api_gateway_rest_api" "api" {
  name  = "${local.name}-api"
}

resource "aws_api_gateway_resource" "analysis" {
  rest_api_id = aws_api_gateway_rest_api.api.id
  parent_id   = aws_api_gateway_rest_api.api.root_resource_id
  path_part   = "analysis"
}

resource "aws_api_gateway_method" "analysis" {
  rest_api_id      = aws_api_gateway_rest_api.api.id
  resource_id      = aws_api_gateway_resource.analysis.id
  api_key_required = "false"
  authorization    = "NONE"
  http_method      = "GET"
}

resource "aws_api_gateway_method_response" "analysis" {
  rest_api_id = aws_api_gateway_rest_api.api.id
  resource_id = aws_api_gateway_resource.analysis.id
  http_method = aws_api_gateway_method.analysis.http_method
  status_code = "200"

  response_models = {
    "text/html" = "Empty"
  }

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = "false"
    "method.response.header.Access-Control-Allow-Methods" = "false"
    "method.response.header.Access-Control-Allow-Origin"  = "false"
  }
  depends_on = [aws_api_gateway_method.analysis]
}

resource "aws_api_gateway_integration" "analysis" {
  connection_type         = "INTERNET"
  content_handling        = "CONVERT_TO_TEXT"
  http_method             = aws_api_gateway_method.analysis.http_method
  integration_http_method = "POST"
  passthrough_behavior    = "WHEN_NO_MATCH"
  resource_id             = aws_api_gateway_resource.analysis.id
  rest_api_id             = aws_api_gateway_rest_api.api.id
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.function_plugin.invoke_arn
}

resource "aws_api_gateway_integration_response" "analysis" {
  http_method = aws_api_gateway_method.analysis.http_method
  resource_id = aws_api_gateway_resource.analysis.id

  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin" = "'*'"
  }

  rest_api_id = aws_api_gateway_rest_api.api.id
  status_code = "200"

  depends_on = [aws_api_gateway_integration.analysis]
}

resource "aws_api_gateway_deployment" "api" {
  rest_api_id       = aws_api_gateway_rest_api.api.id
  stage_name        = "analysis"
  stage_description = "timestamp = ${timestamp()}"

  depends_on = [
    aws_api_gateway_integration.analysis
  ]

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_api_gateway_stage" "api" {
  deployment_id         = aws_api_gateway_deployment.api.id
  cache_cluster_enabled = "false"
  rest_api_id           = aws_api_gateway_rest_api.api.id
  stage_name            = "v1"
  xray_tracing_enabled  = "false"
}

#resource "aws_api_gateway_method_settings" "api" {
#  rest_api_id = aws_api_gateway_rest_api.api.id
#  stage_name  = aws_api_gateway_stage.api.stage_name
#  method_path = "*/*"
#
#  settings {
#    data_trace_enabled = true
#    logging_level      = "INFO"
#  }
#}

resource "aws_lambda_permission" "analysis" {
  action        = "lambda:InvokeFunction"
  function_name = "${local.function_name}_plugin"
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.api.execution_arn}/*/${aws_api_gateway_method.analysis.http_method}/${aws_api_gateway_resource.analysis.path_part}"

  depends_on    = [aws_lambda_function.function_plugin]
}

resource "aws_api_gateway_rest_api_policy" "analysis" {
  rest_api_id = aws_api_gateway_rest_api.api.id

policy = jsonencode({
  Version = "2012-10-17"
  Statement = [
    {
      Effect    = "Allow"
      Principal = "*"
      Action    = "execute-api:Invoke"
      Resource = [
        "${aws_api_gateway_rest_api.api.execution_arn}/*",
      ]
      Condition = {
        IpAddress = {
          "aws:SourceIp" = var.trusted_ip
        }
      }
    },
  ]
})
}
