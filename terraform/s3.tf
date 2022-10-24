# analysis results backet
resource "aws_s3_bucket" "analysis" {
  bucket        = "${local.name}-bucket"
  force_destroy = "false"
}

resource "aws_s3_object" "error" {
  bucket = aws_s3_bucket.analysis.id
  key    = "error.html"
  source = "s3/error.html"
  content_type = "text/html"
  etag = filemd5("s3/error.html")
}

resource "aws_s3_bucket_versioning" "analysis" {
  bucket = aws_s3_bucket.analysis.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_website_configuration" "analysis" {
  bucket = aws_s3_bucket.analysis.bucket

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "error.html"
  }
}

resource "aws_s3_bucket_acl" "analysis" {
  bucket = aws_s3_bucket.analysis.id
  access_control_policy {
    grant {
      grantee {
        id   = data.aws_canonical_user_id.current_user.id
        type = "CanonicalUser"
      }
      permission = "FULL_CONTROL"
    }

    owner {
      id = data.aws_canonical_user_id.current_user.id
    }
  }
}

resource "aws_s3_bucket_request_payment_configuration" "analysis" {
  bucket = aws_s3_bucket.analysis.bucket
  payer  = "BucketOwner"
}

resource "aws_s3_bucket_public_access_block" "image_bucket" {
  bucket                  = aws_s3_bucket.analysis.bucket
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_policy" "analysis" {
  bucket = aws_s3_bucket.analysis.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "AllowPublicRead"
        Effect    = "Allow"
        Principal = {
          "AWS" = "*"
        }
        Action    = "s3:GetObject"
        Resource = [
          "${aws_s3_bucket.analysis.arn}/*",
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

data "aws_canonical_user_id" "current_user" {}


# memory images backet
resource "aws_s3_bucket" "memory" {
  bucket        = "${local.name}-memory-bucket"
  force_destroy = "false"
}

resource "aws_s3_bucket_versioning" "memory" {
  bucket = aws_s3_bucket.memory.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_acl" "memory" {
  bucket = aws_s3_bucket.memory.id
  access_control_policy {
    grant {
      grantee {
        id   = data.aws_canonical_user_id.current_user.id
        type = "CanonicalUser"
      }
      permission = "FULL_CONTROL"
    }

    owner {
      id = data.aws_canonical_user_id.current_user.id
    }
  }
}

resource "aws_s3_bucket_request_payment_configuration" "memory" {
  bucket = aws_s3_bucket.memory.bucket
  payer  = "BucketOwner"
}

resource "aws_s3_bucket_public_access_block" "memory" {
  bucket                  = aws_s3_bucket.memory.bucket
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_notification" "memory" {
  bucket = aws_s3_bucket.memory.id
  eventbridge = true
}
