export function getColorsCount(products) {
    return products.reduce((acc, product) => {
        product.images.forEach(image => {
            const color = image.color;
            const isPresent = acc.hasOwnProperty(color);
            if (!isPresent) {
                acc[color] = 1;
            } else {
                acc[color]++
            }
        });
        return acc;
    }, {});
}

export function getCategoriesCount(products) {
    return products.reduce((acc, product) => {
        product.categories.forEach(category => {
            const isPresent = acc.hasOwnProperty(category);
            if (!isPresent) {
                acc[category] = 1;
            } else {
                acc[category]++
            }
        })
        return acc;
    }, {});
}

export function getAvailabilityCount(products) {
    return products.reduce((acc, product) => {
        const count = product.inStock;

        count ? acc.inStock++ : acc.outOfStock++;
        return acc;
    }, {inStock: 0, outOfStock: 0});
}

export function getMaxPrice(products) {
    let maxValue= Number.MIN_VALUE;

    products.forEach(product => {
        const price = Number(product.price);

        if(price > maxValue) {
            maxValue = price;
        }
    });

    return maxValue;
}

export function getMinPrice(products) {
    let minValue = Number.MAX_VALUE;

    products.forEach(product => {
        const price = Number(product.price);

        if(price < minValue) {
            minValue = price;
        }
    });

    return minValue;
}



