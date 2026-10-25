---
'@suigar/suifrens-display-system': patch
---

Restore the original avatar body placement and facial alignment with or without a crown. Keep the native SVG canvas unchanged and allow complete crown artwork to overflow for unframed characters; framed avatars retain their established crop. This also corrects Capy eyes and other nested SVG artwork that were scaled by the enlarged crown canvas in v1.0.6.
