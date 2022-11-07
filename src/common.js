import { Toast } from 'native-base';
import i18next from 'i18next';
//import ApplicationStore from './mobx/ApplicationStore';

export default {
  async catchHandler(error) {
    try {
      if (!error || !error.response) {
        this.showToast(i18next.t('Messages.SomethingWrong'), 'danger');
        return;
      }
      const code = error.response.status ? error.response.status : 25;
      const message = error.response.data
        ? error.response.data.error
        : i18next.t('Messages.SomethingWrong');
      switch (code) {
        case 401:
          this.showToast(message, 'danger');
          //await ApplicationStore.logoutStore();
          break;
        case 403:
          this.showToast(i18next.t('Messages.Forbidden'), 'danger');
          //await ApplicationStore.logoutStore();
          break;
        case 25:
          this.showToast(message, 'danger');
        default:
          this.showToast(message, 'danger');
          break;
      }
    } catch (error) {
      console.log(error);
    }
  },

  showToast(text, type = 'danger', duration = 5000) {
    let bg = 'danger.500';
    switch (type) {
      case 'danger':
        bg = 'danger.500';
        break;
      case 'success':
        bg = 'green.500';
        break;
      case 'warning':
        bg = 'yellow.500';
        break;
      case 'info':
        bg = 'blue.500';
        break;
      default:
        bg = 'danger.500';
        break;
    }

    Toast.show({
      title: text,
      bg: bg,
      duration: duration
    });
  },
};
