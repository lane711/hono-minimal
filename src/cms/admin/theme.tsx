import { jsx } from "hono/jsx";
import { getById, getDataByPrefix, putData } from "../data/data";
declare const KVDATA: KVNamespace;

const Layout = (props: {
  children?: string;
  formComponents?: any[];
  screenTitle?: string;
}) => {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="icon" href="/docs/4.0/assets/img/favicons/favicon.ico" />

        <title>SonicJs Admin</title>
        <link rel="icon" type="image/x-icon" href="/images/favicon.ico" />

        <link rel="stylesheet" href="/css/admin.css" />
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.form.io/formiojs/formio.full.min.css"
        />
      </head>

      <body class="bg-dark text-light">
        <nav class="navbar navbar-dark sticky-top bg-darker flex-md-nowrap p-0">
          <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">
            <img class="logo" src="/images/sonicjs-logo.svg" />
          </a>
          {/* <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search" /> */}
          <ul class="navbar-nav px-3">
            <li class="nav-item text-nowrap">
              <a class="nav-link" href="#">
                Sign out
              </a>
            </li>
          </ul>
        </nav>

        <div class="container-fluid">
          <div class="row">
            <nav class="col-md-2 d-none d-md-block bg-darker text-muted sidebar px-0">
              <div class="sidebar-sticky">
                <ul class="nav flex-column">
                  <li class="nav-item">
                    <a class="nav-link text-light" href="/admin/sites">
                      <span data-feather="file"></span>
                      Sites
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link text-light" href="/admin">
                      <span data-feather="home"></span>
                      Content <span class="sr-only">(current)</span>
                    </a>
                  </li>

                  <li class="nav-item">
                    <a class="nav-link text-light" href="/admin/modules">
                      <span data-feather="shopping-cart"></span>
                      Modules
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link  text-light" href="/admin/content-types">
                      <span data-feather="users"></span>
                      Content Types
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link  text-light" href="/api/forms">
                      <span data-feather="users"></span>
                      Form Builder
                    </a>
                  </li>
                </ul>
              </div>
            </nav>

            <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
              <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                <h1 class="h2">{props.screenTitle}</h1>
              </div>

              {props.children}
            </main>
          </div>
        </div>

        <script
          src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
          integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
          crossorigin="anonymous"
        ></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.9.2/umd/popper.min.js"></script>
        <script src="https://cdn.usebootstrap.com/bootstrap/4.1.3/js/bootstrap.bundle.min.js"></script>
        <script src="https://cdn.form.io/formiojs/formio.full.min.js"></script>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.4.0/axios.min.js"
          integrity="sha512-uMtXmF28A2Ab/JJO2t/vYhlaa/3ahUOgj1Zf27M5rOo8/+fcTUVH0/E0ll68njmjrLqOBjXM3V9NiPFL5ywWPQ=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        ></script>
        <script src="/js/admin.js"></script>
        <script src="/js/form.js"></script>
      </body>
    </html>
  );
};

const Top = (props: { items: object[]; screenTitle: string }) => {
  return (
    <Layout screenTitle={props.screenTitle}>
      <ul>
        {props.items.map((item:any) => {
          return (
            <li>
              <a class="text-light" href={item.path}>
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
};

const Form = (props: { title: string; screenTitle: string }) => {
  return (
    <Layout screenTitle={props.screenTitle + ": " + props.title}>
      <div class="pb-2 mb-3">
        <button id="contentFormSaveButton" class="btn btn-warning" onclick="onContentFormSave()" disabled>
          Save Content Type
        </button>{" "}
      </div>

      <div id="formio"></div>
    </Layout>
  );
};

export async function loadAdmin(context) {

    await putData(context.env.KVDATA, 'site1', 'content', {title: '20230508'});


  const data = await getDataByPrefix(context.env.KVDATA);

  const list = data.keys.map((item) => {
    return {
      title: item.name,
      path: `/admin/content/${item.name}`,
    };
  });

  return <Top items={list} screenTitle="Content" />;
}

export async function loadModules(context) {
  const data = await getDataByPrefix(context.env.KVDATA, "site1::module");

  const list = data.keys.map((item) => {
    return {
      title: item.name,
      path: `/admin/content-types/${item.name}`,
    };
  });

  return <Top items={list} screenTitle="Modules" />;
}

export async function loadSites(context) {
  const data = await getById(context.env.KVDATA, "host::sites");

  // console.log('data site', data[0])
  const list = data.map((item) => {
    return {
      title: item.title,
      path: `/admin/content-types/${item.name}`,
    };
  });

  return <Top items={list} screenTitle="Sites" />;
}

export async function loadContentTypes(context) {
  // await putData(context.env.KVDATA, 'site1', 'content-type', {title: 'blog-post'}, "site1::content-type::blog-post");

  const data = await getDataByPrefix(context.env.KVDATA, "site1::content-type");
  console.log("data", data.keys[0]);

  const list = data.keys.map((item) => {
    return {
      title: item.name,
      path: `/admin/content-types/${item.name}`,
    };
  });

  return <Top items={list} screenTitle="Content Types" />;
}

export async function loadContentType(context) {
  // await putData(context.env.KVDATA, 'site1', 'content-type', {title: 'blog-post'}, "site1::content-type::blog-post");

  const data = await getById(
    context.env.KVDATA,
    "site1::content-type::blog-post"
  );
  // console.log("data", data.title);

  // const list = data.map((item) => item.title);

  return <Form title={data.title} screenTitle="Content Type" />;
}

// app.get("/new", async (c) => {
//   KVDATA.put(`todo_${Date.now()}`, JSON.stringify({ "foo": "bar" }));

//   const list = [];

//   return c.html(<Top messages={list} />);
// });
