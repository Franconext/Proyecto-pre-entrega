const main = async () => {
  const args = process.argv.slice(2);

  const [metodo, ruta, ...datos] = args;

  if (!metodo || !ruta) {
    console.log("❌ Tenés que pasar método y ruta");
    return;
  }

  const partes = ruta.split("/");
  const recurso = partes[0];
  const id = partes[1];

  const baseURL = "https://fakestoreapi.com";

  try {
    // 🔹 GET TODOS
    if (metodo === "GET" && recurso === "products" && !id) {
      const res = await fetch(`${baseURL}/products`);
      const data = await res.json();
      console.log(data);
    }

    // 🔹 GET POR ID
    else if (metodo === "GET" && recurso === "products" && id) {
      const res = await fetch(`${baseURL}/products/${id}`);
      const data = await res.json();
      console.log(data);
    }

    // 🔹 POST
    else if (metodo === "POST" && recurso === "products") {
      const [title, price, category] = datos;

      if (!title || !price || !category) {
        console.log("❌ Faltan datos: title price category");
        return;
      }

      const res = await fetch(`${baseURL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          price: Number(price),
          category
        })
      });

      const data = await res.json();
      console.log("✅ Producto creado:");
      console.log(data);
    }

    // 🔹 DELETE
    else if (metodo === "DELETE" && recurso === "products" && id) {
      const res = await fetch(`${baseURL}/products/${id}`, {
        method: "DELETE"
      });

      const data = await res.json();
      console.log("🗑️ Producto eliminado:");
      console.log(data);
    }

    // 🔹 ERROR
    else {
      console.log("❌ Comando no válido");
    }

  } catch (error) {
    console.log("❌ Error:", error.message);
  }
};

main();