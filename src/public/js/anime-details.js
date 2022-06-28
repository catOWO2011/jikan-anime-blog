import utils from './utils.js';

$(document).ready(async function(){
  utils.buildAnimeHeaderDetails({
    selector: '.anime-details-header-container',
    classData: 'anime-details'
  });

  // utils.buildAnimeVideoDetails({
  //   selector: '.anime-details-body-content .inner-content',
  //   classData: 'anime-details-videos'
  // });

  class MenuActions {
    menuContainer;
    constructor({ menuContainer, contentTarget, utilMap }) {
      this.menuContainer = menuContainer;
      this.contentTarget = contentTarget;
      this.utilMap = utilMap;
      this.previousTargetName = null;
      this.hideContents();

      // Actions
      $(`${menuContainer} li`).on('click', async ({ target }) => {
        const targetName = $(target).data('targetContent');
        console.log(targetName, '...targetName');

        if (this.previousTargetName) {
          $(`div[data-target-source='${this.previousTargetName}']`).parent().hide();
        }
        
        await this.utilMap[targetName]();
        console.log($(`div[data-target-source='${targetName}']`));
        $(`div[data-target-source='${targetName}']`).parent().show();
        this.previousTargetName = targetName;
      });
    }

    hideContents = () => {
      $(`${this.contentTarget}`).children().hide();
      // console.log($(`${this.menuContainer}`).find('li'));
      // const list = $(`${this.menuContainer}`).find('li');

      // $.each(list, (index, li) => {
      //   const element = $(li);
      //   const targetName = element.data('targetContent');
      //   const targetElement = $($(`${this.contentTarget}`).find(`div[data-target-source='${targetName}']`));
      //   console.log($(`${this.contentTarget}`).html(), 'target');
      //   targetElement.parent().hide();
      // });
    }
  };

  const menu = new MenuActions({
    menuContainer: '.anime-details-body-nav-bar',
    contentTarget: '.anime-details-body-content',
    utilMap: {
      'video-list-content': async () => {
        await utils.buildAnimeVideoDetails({
          selector: '.anime-details-body-content .anime-videos-content',
          classData: 'anime-details-videos'
        });
      },

      'characters-and-staff-content': async () => {
        await utils.buildAnimeCharactersAndStaff({
          selector: '.anime-details-body-content .anime-characters-and-staff-content',
          classData: 'anime-details-characters-and-staff'
        });
      }
    }
  });

});