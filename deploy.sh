#/!/bin/zsh
kubectl delete secret todo-app-env-config
kubectl create -f env-secret/todo-app-env-config.yaml

kubectl apply -f api/k8s/todo-app-api-deployment.yaml
kubectl apply -f api/k8s/todo-app-api-service.yaml

kubectl apply -f client/k8s/todo-app-client-deployment.yaml
kubectl apply -f client/k8s/todo-app-client-service.yaml

kubectl apply -f reverse-proxy/k8s/todo-app-rp-deployment.yaml
kubectl apply -f reverse-proxy/k8s/todo-app-rp-service.yaml