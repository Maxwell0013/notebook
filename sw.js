// Notebook service worker — handles notification clicks and keeps the
// registration alive so scheduled (TimestampTrigger) nudges can fire even
// when the tab/browser is closed.

self.addEventListener("install", function(e){ self.skipWaiting(); });
self.addEventListener("activate", function(e){ e.waitUntil(self.clients.claim()); });

self.addEventListener("notificationclick", function(e){
  e.notification.close();
  var url = (e.notification.data && e.notification.data.url) || "./";
  e.waitUntil(
    self.clients.matchAll({type:"window", includeUncontrolled:true}).then(function(list){
      for (var i=0;i<list.length;i++){
        var c=list[i];
        if ("focus" in c) { c.focus(); return; }
      }
      if (self.clients.openWindow) return self.clients.openWindow(url);
    })
  );
});

// If a push backend is ever added, this lets it deliver nudges too.
self.addEventListener("push", function(e){
  var body = "Jot down what you're working on.";
  try { if (e.data) body = e.data.text() || body; } catch(_){}
  e.waitUntil(self.registration.showNotification("Notebook", {
    body: body, requireInteraction: true, data:{url:"./"}
  }));
});
