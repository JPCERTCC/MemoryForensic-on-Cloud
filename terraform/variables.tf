# Region to build the system
variable "region" {
  default = "us-east-1"
}

# Docker image name
variable "image_name" {
  default = "memory-analysis"
}

# Dockerfile directory
variable "docker_dir" {
  default = "docker"
}

# Analysis script directory
variable "codecommit_dir" {
  default = "analysis_script"
}

# Username to commit to Codecommit
variable "codecommit_username" {
  default = "terraformer"
}

# E-mail to commit to Codecommit
variable "codecommit_email" {
  default = "test@example.com"
}

# System name to build on AWS
variable "app_name" {
  default = "memory-analysis"
}

# IP address to access API Gateway and S3
variable "trusted_ip" {
  default = "192.168.1.1/32"
}

# Network address used by VPC
variable "cidr_block_vpc" {
  default = "172.20.0.0/16"
}

# AWS access key
variable "aws_access_key_id" {
  default = ""
}

# AWS secret access key
variable "aws_secret_access_key" {
  default = ""
}

# E-mail to notify the analysis status
variable "sns_email" {
  default = ""
}
