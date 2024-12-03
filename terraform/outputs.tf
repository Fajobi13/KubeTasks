output "vpc_id" {
  value = aws_vpc.main.id
}

output "rds_endpoint" {
  value = aws_db_instance.web_rds.endpoint
}

output "eks_cluster_name" {
  value = aws_eks_cluster.eks.name
}

output "eks_node_group_name" {
  value = aws_eks_node_group.node_group.node_group_name
}