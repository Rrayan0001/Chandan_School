const fs = require('fs');
const path = require('path');

const srcImagesDir = '/Users/mrrayan07/Desktop/chandan_website/school_chandan_images';
const srcVideosDir = '/Users/mrrayan07/Desktop/chandan_website/school_chandan_videos';
const destAssetsDir = '/Users/mrrayan07/Desktop/chandan_website/public/assets';

// Create destination directories
const cmDir = path.join(destAssetsDir, 'cm');
const videosDir = path.join(destAssetsDir, 'videos');
const galleryDir = path.join(destAssetsDir, 'gallery');

if (!fs.existsSync(cmDir)) fs.mkdirSync(cmDir, { recursive: true });
if (!fs.existsSync(videosDir)) fs.mkdirSync(videosDir, { recursive: true });
if (!fs.existsSync(galleryDir)) fs.mkdirSync(galleryDir, { recursive: true });

try {
  // 1. Copy CM Images
  for (let i = 1; i <= 3; i++) {
    fs.copyFileSync(path.join(srcImagesDir, `CM_${i}.JPG`), path.join(cmDir, `CM_${i}.jpg`));
  }
  
  // 2. Copy CM Video
  fs.copyFileSync(path.join(srcVideosDir, 'CM Siddaharamiah.mp4'), path.join(videosDir, 'CM_Siddaharamiah.mp4'));

  // 3. Copy Gallery Proofs 1-7
  for (let i of ['', '2', '3', '4', '5', '6', '7']) {
    fs.copyFileSync(path.join(srcImagesDir, `School-chandan-Prospectus-proof${i}.jpg`), path.join(galleryDir, `School-chandan-Prospectus-proof${i}.jpg`));
  }

  // 4. Reuse Gallery Proofs for 8-11
  fs.copyFileSync(path.join(galleryDir, 'School-chandan-Prospectus-proof.jpg'), path.join(galleryDir, 'School-chandan-Prospectus-proof8.jpg'));
  fs.copyFileSync(path.join(galleryDir, 'School-chandan-Prospectus-proof2.jpg'), path.join(galleryDir, 'School-chandan-Prospectus-proof9.jpg'));
  fs.copyFileSync(path.join(galleryDir, 'School-chandan-Prospectus-proof3.jpg'), path.join(galleryDir, 'School-chandan-Prospectus-proof10.jpg'));
  fs.copyFileSync(path.join(galleryDir, 'School-chandan-Prospectus-proof4.jpg'), path.join(galleryDir, 'School-chandan-Prospectus-proof11.jpg'));

  console.log('SUCCESS');
} catch (e) {
  console.error('ERROR:', e.message);
}
