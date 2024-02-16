const { scrapeSearchResult }  =  require("../services/amazonScraper");

const getSearchResult = async function (req, res) {
    try {
        const keyword = req.query.keyword;
        const response = await scrapeSearchResult(keyword);

        if (!response.success) {
            res.status(500).json({ success: false, error: scrapedData.error });
        }
            
        res.send({ success: true, data: response.data });

    } catch (error) {
        res.status(500).json({ 
            success: false,
            error: 'Internal Server Error' 
        });
    }
}

module.exports = { getSearchResult };