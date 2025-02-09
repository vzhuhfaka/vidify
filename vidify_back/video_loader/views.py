from django.http import JsonResponse
 
def index(request, name):
    return JsonResponse({"name": f"{name}", "age": 38})