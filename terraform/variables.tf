variable "region" {
  default     = "eu-west-2"
  description = "AWS region for deployment"
}

variable "vpc_cidr" {
  default     = "10.0.0.0/16"
  description = "CIDR block for the VPC"
}

variable "public_subnets" {
  default     = ["10.0.1.0/24", "10.0.2.0/24"]
  description = "CIDR blocks for public subnets"
}

variable "private_subnets" {
  default     = ["10.0.3.0/24", "10.0.4.0/24"]
  description = "CIDR blocks for private subnets"
}

variable "db_username" {
  default     = "dbadmin"
  description = "Database username"
}

variable "db_password" {
  description = "Database password"
  sensitive   = true
}