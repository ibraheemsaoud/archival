---
title: Archival
---
# Home Page Content

The content comes from the server, there are multiple types of content we display on the main page:\
sponspored content (Fashion Weeks, Brands, <SwmLink doc-title="Season">[Season](/.swm/season.st666ksy.sw.md)</SwmLink>, Creators)

It also shows the normal feed of the user.

this all happens on <SwmPath>[src/screens/Home/](/src/screens/Home/)</SwmPath>

using this script

<SwmSnippet path="/src/screens/Home/Home.tsx" line="13">

---

Home Page Content Loader

```tsx
  const { brands, fashionWeeks } = useLoaderData() as any as {
    brands?: IBrand[];
    fashionWeeks?: IFashionWeek[];
  };

  if (!brands) return <Loader />;
```

---

</SwmSnippet>

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBYXJjaGl2YWwlM0ElM0FpYnJhaGVlbXNhb3Vk" repo-name="archival"><sup>Powered by [Swimm](https://app.swimm.io/)</sup></SwmMeta>
