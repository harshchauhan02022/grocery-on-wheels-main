const express = require('express');
const BannerController = require('../../controller/bannerController/BannerController');
const router = express.Router();

router.get('/', BannerController.getAllBanners);
router.get('/:id', BannerController.getBannerById);
router.post('/add', BannerController.createBanner);
router.post('/addMultiple', BannerController.createMultipleBanners);
router.put('/edit/:id', BannerController.updateBanner);
router.delete('/delete/:id', BannerController.deleteBanner);

module.exports = router;
