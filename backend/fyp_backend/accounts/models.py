from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from datetime import datetime
import uuid
# Create your models here.

class Users(AbstractUser):
    uuid = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    address = models.CharField(max_length=200,blank=False,null=False)
    contact = models.CharField(max_length=13,blank=False,null=False,unique=True)
    
    

