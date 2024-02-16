const axios = require('axios');
const cheerio = require('cheerio');

const scrapeSearchResult = async (keyword) => {
    try {
        // fetch html of the search result page
        const response = await axios.get(`https://www.amazon.com/s?k=${keyword}`);

        // load response data into cheerio
        const $ = cheerio.load(response.data);

        const products = [];

        // parse result items in the first page
        $('.s-asin').each((i, el) => {
            // find the rating and review text
            const ratingAndReview = $(el).find('.a-spacing-top-micro span a span').text();

            // split the rating and review text to get rating and number of reviews
            const ratingData = ratingAndReview?.split('stars');
            const rating = ratingData[0]?.trim().split(' ')[0];
            const numberOfRatings = ratingData[1]?.trim();

            // create product object and parse the data from html element to object
            const product = {
                id: $(el).attr('data-asin'),
                name: $(el).find('h2 a span').text(),
                price_whole: $(el).find('.a-price-whole').text() || 0,
                price_fraction: $(el).find('.a-price-fraction').text() || "00",
                rating: rating || "0",
                numberOfRatings: numberOfRatings || "0",
                image: $(el).find('.s-image').attr('src'),
                link: 'https://www.amazon.in'+$(el).find('.a-link-normal').attr('href'),
            };
            products.push(product);
        });

        return { success: true, data: products };
    } 
    catch (error) {
        return { success: false, error: 'Error while scraping data.' };
    }
}

module.exports = { scrapeSearchResult };