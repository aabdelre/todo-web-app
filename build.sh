#/!/bin/zsh
echo "Building Reverse Proxy"
cd reverse-proxy
#docker build --platform linux/amd64 -t registry.digitalocean.com/first-registry-shantala/todo-app:rp .
#docker push registry.digitalocean.com/first-registry-shantala/todo-app:rp

echo "Building env config"
cd ../env-config
rm todo-app-env-config.yaml
cp todo-app-env-config.yaml.sample todo-app-env-config.yaml
sed -i '' -e "s/___MONGODB_USERNAME___/${MONGODB_USERNAME}/g" todo-app-env-config.yaml
sed -i '' -e "s/___MONGODB_PASSWORD___/${MONGODB_PASSWORD}/g" todo-app-env-config.yaml
sed -i '' -e "s/___MONGODB_CLUSTER_HOSTNAME___/${MONGODB_CLUSTER_HOSTNAME}/g" todo-app-env-config.yaml

echo "Building API"
cd ../api
#rm -rf node_modules
#rm package-lock.json
#docker build --platform linux/amd64 -t registry.digitalocean.com/first-registry-shantala/todo-app:api .
#docker push registry.digitalocean.com/first-registry-shantala/todo-app:api

echo "Building Client"
cd ../client
#rm -rf node_modules
#rm package-lock.json
#docker build --platform linux/amd64 -t registry.digitalocean.com/first-registry-shantala/todo-app:client .
#docker push registry.digitalocean.com/first-registry-shantala/todo-app:client
