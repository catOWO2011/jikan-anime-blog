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
    constructor({
      menuContainer,
      contentTarget,
      utilMap,
      defaultContentToShow
    }) {
      this.menuContainer = menuContainer;
      this.contentTarget = contentTarget;
      this.defaultContentToShow = defaultContentToShow;
      this.utilMap = utilMap;
      this.previousTargetName = null;

      // Actions
      $(`${this.menuContainer} li`).on('click', async ({ target }) => {
        const targetListItem = $(target);
        const targetName = targetListItem.data('targetContent');

        if (this.previousTargetName) {
          const previousElement = $(`div[data-target-source='${this.previousTargetName}']`);
          const parentComponent = previousElement.parent();
          parentComponent.hide();
          const previousTargetListItem = $(`li[data-target-content='${this.previousTargetName}']`);
          previousTargetListItem.removeClass('active');
        }
        
        await this.utilMap[targetName]();
        const targetElement = $(`div[data-target-source='${targetName}']`);
        const parentTarget = targetElement.parent();
        parentTarget.show();

        targetListItem.addClass('active');

        this.previousTargetName = targetName;
      });
    }

    setupContents = () => {
      $(`${this.contentTarget}`).children().hide();
      $(`${this.menuContainer} li[data-target-content="${this.defaultContentToShow}"]`).trigger('click');
    }
  };

  const menu = new MenuActions({
    menuContainer: '.anime-details-body-nav-bar',
    contentTarget: '.anime-details-body-content',
    defaultContentToShow: 'video-list-content',
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

  menu.setupContents();

});