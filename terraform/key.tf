resource "aws_key_pair" "deploy" {
  key_name   = "react-devops-assessment"
  public_key = file(pathexpand("~/.ssh/react-devops-assessment.pub"))

  tags = {
    Name = "react-devops-assessment"
  }
}