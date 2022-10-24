resource "aws_vpc" "analysis_subnet" {
  cidr_block = var.cidr_block_vpc

  enable_dns_support = true
  enable_dns_hostnames = true
}

# private subnet
resource "aws_subnet" "analysis_subnet" {
  vpc_id = aws_vpc.analysis_subnet.id
  map_public_ip_on_launch = true

  cidr_block = "${cidrsubnet(aws_vpc.analysis_subnet.cidr_block,8,20)}"
}

# public subnet
resource "aws_subnet" "analysis_subnet-public" {
  vpc_id            = aws_vpc.analysis_subnet.id
  cidr_block        = "${cidrsubnet(aws_vpc.analysis_subnet.cidr_block,8,1)}"
  availability_zone = "${var.region}a"
}

# Gateway
resource "aws_internet_gateway" "main-gw" {
  vpc_id = aws_vpc.analysis_subnet.id
}

# VPC Endpoint
resource "aws_vpc_endpoint" "ecr_api" {
  service_name      = "com.amazonaws.${var.region}.ecr.api"
  vpc_endpoint_type = "Interface"
  vpc_id            = aws_vpc.analysis_subnet.id
  subnet_ids        = [aws_subnet.analysis_subnet.id]

  security_group_ids = [
    aws_security_group.https.id,
  ]

  private_dns_enabled = true
}

resource "aws_vpc_endpoint" "ecr_dkr" {
  service_name      = "com.amazonaws.${var.region}.ecr.dkr"
  vpc_endpoint_type = "Interface"
  vpc_id            = aws_vpc.analysis_subnet.id
  subnet_ids        = [aws_subnet.analysis_subnet.id]

  security_group_ids = [
    aws_security_group.https.id,
  ]

  private_dns_enabled = true
}

resource "aws_vpc_endpoint" "logs" {
  service_name      = "com.amazonaws.${var.region}.logs"
  vpc_endpoint_type = "Interface"
  vpc_id = aws_vpc.analysis_subnet.id
  subnet_ids = [aws_subnet.analysis_subnet.id]

  security_group_ids = [
    aws_security_group.https.id,
  ]
  private_dns_enabled = true
}

resource "aws_vpc_endpoint" "s3" {
  service_name      = "com.amazonaws.${var.region}.s3"
  vpc_endpoint_type = "Gateway"
  vpc_id            = aws_vpc.analysis_subnet.id

  route_table_ids = [
    aws_default_route_table.default-route-table.id
  ]
}

resource "aws_vpc_endpoint" "git-codecommit" {
  service_name      = "com.amazonaws.${var.region}.git-codecommit"
  vpc_endpoint_type = "Interface"
  vpc_id            = aws_vpc.analysis_subnet.id
  subnet_ids        = [aws_subnet.analysis_subnet.id]

  security_group_ids = [
    aws_security_group.https.id,
  ]

  private_dns_enabled = true
}

# Routing default
resource "aws_default_route_table" "default-route-table" {
  default_route_table_id = aws_vpc.analysis_subnet.default_route_table_id
}

resource "aws_route_table_association" "route-private" {
  route_table_id = aws_default_route_table.default-route-table.id
  subnet_id      = aws_subnet.analysis_subnet.id
}

# Routing internet
resource "aws_route_table" "public-route-table" {
  vpc_id = aws_vpc.analysis_subnet.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main-gw.id
  }
}

resource "aws_route_table_association" "route-public" {
  route_table_id = aws_route_table.public-route-table.id
  subnet_id      = aws_subnet.analysis_subnet-public.id
}

resource "aws_security_group" "https" {
  name        = "https"
  description = "https"
  vpc_id      = aws_vpc.analysis_subnet.id

  egress {
    cidr_blocks = ["0.0.0.0/0"]
    from_port   = 0
    protocol    = "-1"
    to_port     = 0
  }

  ingress {
    cidr_blocks = ["0.0.0.0/0"]
    from_port   = 443
    protocol    = "tcp"
    to_port     = 443
  }

  timeouts {}
}
