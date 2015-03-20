# Interportlet communication #

Ajax Portal supports the following ways for Interportlet communication:
  1. Direct usage of JavaScript API of the portlets (Web applications)
  1. Usage of Ajax Portal API (Communication Messages (Events)).


## Communication Messages ##

_Communication Messages_ are sent by portlets on clent side using Portlet API. All _Communication Messages_ are stored in Queue. The Queue is implemented on server and client sides. The same message can be stored in both Queues. After Portal page refresh _Communication Messages_ from client Queue are lost, but _Communication Messages_ from server Queue are restored (reloaded from server side).

There are following types of the _Communication Messages_:
  1. Point to Point (the message is deleted if the portlet gets/loads/receives the _Communication Messages_).
  1. Point to Subscriber (are avalable for several portlets during some time), are divided on two following groups:
    * temporary (which are deleted after specified time)
    * static  (which are deleted when Queue is overloaded)


## Direct usage of JavaScript API of the portlets (Web applications) ##



## Usage of Ajax Portal Queue for Interportlet communication Messages (Events) ##