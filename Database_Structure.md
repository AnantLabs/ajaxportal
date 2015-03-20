# Database Structure of Ajax Portal #

## Introduction ##

Ajax Portal supports the following base services:
  1. Authenticaton
  1. 2 kinds of Authorization (role based and permission based),
  1. Multy-service support for one user,
  1. Customization functionality (possibility to create a new portlet, change the parameter(s) of existing portlet, delete a portlet, to move the portlet in the region or move the portlet in another region),
  1. Repository - a storage of all known portlets, porjaxs, plug-ins, widgets and mobile Web applications. The repository supports a hierarchy for the portlets. The portlets can be associated with portal page.

## Logical model ##

<img src='http://ajaxportal.googlecode.com/svn/trunk/images/db_model_logic.gif'>
<blockquote>Picture 1. Logical model of Ajax Portal database</blockquote>


<h2>Physical model</h2>

<img src='http://ajaxportal.googlecode.com/svn/trunk/images/db_model.gif'>
<blockquote>Picture 2. Physical model (ORACLE) of Ajax Portal database