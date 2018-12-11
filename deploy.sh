docker build -t darking360/docker-complex-client -t darking360/docker-complex-client:$SHA -f ./client/Dockerfile ./client
docker build -t darking360/docker-complex-server -t darking360/docker-complex-server:$SHA -f ./server/Dockerfile ./server
docker build -t darking360/docker-complex-worker -t darking360/docker-complex-worker:$SHA -f ./worker/Dockerfile ./worker
docker push darking360/docker-complex-client
docker push darking360/docker-complex-server
docker push darking360/docker-complex-worker
kubectl apply -f k8s
kubectl set image deployments/server-deployment server=darking360/docker-complex-server:$SHA
kubectl set image deployments/server-deployment server=darking360/docker-complex-client:$SHA
kubectl set image deployments/server-deployment server=darking360/docker-complex-worker:$SHA