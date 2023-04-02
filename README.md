## Application Overview

![multi_services_kubernetes drawio (1)](https://user-images.githubusercontent.com/114280300/229338817-5c0199a0-f086-425c-b35c-c6dff284ac4c.png)

## Breakdown the structure

- **_Ingress_** is an object used to manage external access to services in a cluster. It allows external users and client applications to access HTTP(S) services running inside a kubernetes cluster, by providing a set of tules that map incoming requests to the appropriate backend services. Each rules define a set of paths and a corresponding backend services t hat should handle requests that match those paths.
- [**_Nginx Ingress_**](https://github.com/kubernetes/ingress-nginx) is an ingress controller for Kuberntes using Nginx as a reverse proxy and load balancer.
- **_Service_** in general and **_ClusterIP Service_** in particular is an object for exposing a network application (Networking). ClusterIP Service exposes a set of pods within the same cluster to other objects in the same cluster and it also will loading balancing the requests, ClusterIP Services can only accessible from within a cluster . A service object has 4 different types: NodePort, ClusterIP, LoadBalancer, Ingress. 
- **_Deployment_** is an object that manages a set of replica Pods. It provides declarative updates for Pods and ReplicaSets. A Deployment ensures that a specified number of replica Pods are running at any given time, and it can scale the number of replicas up or down based on the user's desired state.
- **_Persistent Volume Claim(PVC)_** is a request for storage resources by a user or application. A PVC is used to consume or use a Persistent Volume (PV), which is a piece of storage provisioned by an administrator in the Kubernetes cluster. An application can use a PVC to request a certain amount of storage and the Kubernetes system will automatically assign an appropriate PV to the application. In the diagram above will be the postgres requests for storage resources, postgres needs to persist its data in some cases like a pod being killed or shut down
