define(['notification'], function(Notification) {
  butterfly.on('NotificationArrived', function(dataArr) {
    var fromBar = dataArr[0], msg = dataArr[1];
    console.log('fromBar: ', fromBar);
    console.log('msg :', msg);
    if (!msg || 'main' !== msg.moduleid) return;
    Notification.show({type:'info', message:msg.message, duration:5000});
  });
});