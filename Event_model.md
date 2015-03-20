# Event model #

Events are used for inter-portlet communication between portlets.


## Event ##

The event has the following attributes:
  1. **portletTagId** - id of portlet element,
  1. **portletUId** - identifier of the portlet,
  1. **name** - event name,
  1. **value** (Json String or Object, can be converted from one type to another by kernel of Ajax Portal) - transfer data,
  1. **receiver** (portletTagId or portletUId or null) - point to point or for all.
  1. **expiredTime** - after this date/time the event is not valid and cannon be observed and will be deleted by garbage collector of the portal.
  1. **deleted** - the marker. If the marker value is **true** the event is not valid and should be deleted by garbage collector of the portal.

## Event Queue ##

All events are put in the **Event Queue** of the portal. All portlets can be read thess events wthout any restriction.

### Event Queue Methods ###

TBD

### Update Queue ###

Any event is not deleted by portlet after


### Alternative of Event Queue usage ###

TBD