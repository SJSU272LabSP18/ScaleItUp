
# Project Team 19 – Scaleit Up App

## Student Names:
Manikant Prasad,
Megha Nair,
Vidhya VijayaKumar,
Aditya Chouhan

## Code Description:

Please refer the below section on how to start the frontend and backend servers. We have described here how to start these servers in user mode.

* frontend – Go to frontend folder.
		 Run the command in series: 
		 > npm install
		 > npm start       (this will start the server at port 3000)
  package.json is updated here. In case of any package missing, please use the below command to install it. Please use sudo in case of linux system.
		> npm install <package_name> --save

In case of any issues, related to npm install. Please delete package-lock.json file and then retry.
	
* backend1 – Go to backend1 folder. Go to folder backend1/flask_virtual
		Run the following commands:
		 > source bin/activate
             > python3 flaskApp.py  (this will start the server at port 5000)
  
In case of any issue , install pip3 to install any missing modules as per requirements.txt file. Use below command to install missing module:
             > pip3 install <module_name>
