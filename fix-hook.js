const fs = require('fs');
const path = 'app/(project)/admin/page.jsx';
const content = fs.readFileSync(path, 'utf-8');
const match = content.match(/useEffect\(\(\) => \{[\s\S]*?\}, \[\]\);/);
if (match) {
    let newContent = content.replace(match[0], '');
    newContent = newContent.replace('const AdminPage = () => {', 'const AdminPage = () => {\n' + match[0] + '\n');
    fs.writeFileSync(path, newContent);
    console.log('Replaced successfully');
} else {
    console.log('Match not found');
}
