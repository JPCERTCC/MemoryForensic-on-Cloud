terraform {
  required_version = "1.2.3"

  required_providers {
    aws = "4.19.0"
  }

  backend "s3" {
    bucket  = "memory-analysis-tfstate-s3"
    key     = "terraform.tfstate"
    region  = "us-east-2"
    encrypt = true
  }
}

provider "aws" {
  region  = var.region
}

locals {
  function_name = "${var.app_name}-func"
  name = var.app_name
}
