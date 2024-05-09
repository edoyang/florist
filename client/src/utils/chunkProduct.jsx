export const chunkProducts = (products, productsPerGrid) => {
    return Array.from({ length: Math.ceil(products.length / productsPerGrid) }, (v, i) =>
        products.slice(i * productsPerGrid, i * productsPerGrid + productsPerGrid)
    );
};
