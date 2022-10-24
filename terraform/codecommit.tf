resource "aws_codecommit_repository" "analysis" {
  repository_name = "${local.name}-repo"
}

resource "null_resource" "push_pruebascode" {
  triggers = {
    file1 = "${sha256(file("analysis_script/analysis.py"))}"
    file2 = "${sha256(file("analysis_script/template.css"))}"
    file3 = "${sha256(file("analysis_script/template.html"))}"
    file4 = "${sha256(file("analysis_script/template.js"))}"
  }

  provisioner "local-exec" {
    command = <<EOT
	cd ${var.codecommit_dir}
  mkdir dev
  cd dev
  rm -rf .git
  git init
  git config --global init.defaultBranch main
	git config --local user.name ${var.codecommit_username}
	git config --local user.email ${var.codecommit_email}
	git config --local credential.helper '!aws codecommit credential-helper $@'
	git config --local credential.UseHttpPath true
	git remote add origin ${aws_codecommit_repository.analysis.clone_url_http}
	git remote -v
  git branch -m main
  git pull origin main
  cp ../analysis.py .
  cp ../template.* .
  git add .
	git commit -m "Updated analysis script ${timestamp()}"
	git push -u origin main
      EOT
    interpreter = ["/bin/bash", "-c"]
    working_dir = path.module
  }

  depends_on = [aws_codecommit_repository.analysis]
}
