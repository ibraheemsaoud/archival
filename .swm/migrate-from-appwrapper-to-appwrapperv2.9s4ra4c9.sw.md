---
title: Migrate from AppWrapper to AppWrapperV2
---
if you are still using <SwmToken path="/src/components/AppWrapper/AppWrapper.tsx" pos="10:4:4" line-data="export const AppWrapper = ({">`AppWrapper`</SwmToken> in your code, you should migrate to V2 using this guide:

# Guide and steps

## 1\. **General consideration**

some things to take into consideration

## 2\. Depricated Elements

<SwmSnippet path="/src/components/AppWrapper/AppWrapper.tsx" line="12">

---

Primary Color is no longer supported

```tsx
  primaryColor = PRIMARY_COLOR,
```

---

</SwmSnippet>

please switch to AccentColor instead

&nbsp;

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBYXJjaGl2YWwlM0ElM0FpYnJhaGVlbXNhb3Vk" repo-name="archival"><sup>Powered by [Swimm](https://app.swimm.io/)</sup></SwmMeta>
