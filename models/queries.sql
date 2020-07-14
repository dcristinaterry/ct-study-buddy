-- Selecting Sessions User is not a participant and not host of the classes he belongs to

SELECT * FROM Sessions
WHERE HOST_ID IS NOT USER_ID
INNER JOIN UserClasses on sessions.classId = userclasses.class id 
where userclasses.userid=sessions.hostid


