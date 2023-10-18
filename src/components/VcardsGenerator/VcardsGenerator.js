


export function generateVCard(userData) {
  const socialLinks = [
    userData.instagram ? `X-SOCIALPROFILE;type=instagram:x-user=${userData.instagram}\n` : '',
    userData.twitter ? `X-SOCIALPROFILE;type=twitter:x-user=${userData.twitter}\n` : '',
    userData.facebook ? `X-SOCIALPROFILE;type=facebook:x-user=${userData.facebook}\n` : '',
    userData.linkedin ? `X-SOCIALPROFILE;type=linkedin:x-user=${userData.linkedin}\n` : '',
    userData.pinterrest ? `X-SOCIALPROFILE;type=pinterrest:x-user=${userData.pinterrest}\n` : '',
    userData.youtube ? `X-SOCIALPROFILE;type=youtube:x-user=${userData.youtube}\n` : '',
  ].join('');

  const vcard =
    `BEGIN:VCARD\nVERSION:3.0\n` +
    `N:${userData.full_name};;;\n` +
    `FN:${userData.full_name}\n` +
    `TEL;CELL:${userData.phone_number}\n` +
    `EMAIL;HOME:${userData.email}\n` +
    `ORG;WORK:${userData.societe}\n` +
    `TITLE:${userData.fonction}\n` +
    `ADR;HOME:${userData.adresse}\n` +
    socialLinks +
    `END:VCARD`;

  return vcard;
}




export function saveVCard(vcardData, userData) {
  if (vcardData) {
    const blob = new Blob([vcardData], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);

    const newLink = document.createElement('a');
    newLink.download = `${userData.full_name}.vcf`;
    newLink.href = url;
    newLink.click();
  }
}
