const Pusher = require('pusher');

const pusher = new Pusher({
  appId: 'YOUR_APP_ID',
  key: 'YOUR_APP_KEY',
  secret: 'YOUR_APP_SECRET',
  cluster: 'YOUR_APP_CLUSTER',
  useTLS: true
});

exports.handler = async (event, context) => {
  const { nama, pesan } = JSON.parse(event.body);

  try {
    // Kirim pesan ke channel di Pusher
    await pusher.trigger('chat-channel', 'new-message', {
      nama: nama,
      pesan: pesan
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Pesan berhasil dikirim!' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Terjadi kesalahan saat mengirim pesan' })
    };
  }
};