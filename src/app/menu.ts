import { Menu, MenuItemConstructorOptions } from 'electron';
import { IGloablStore } from './interface.js';
import { addTab, switchTab } from './tools/index.js';

/** @function 渲染菜单 */
export const updateMenu = (store: IGloablStore) => {
  const activeWindow = store.windowList.find(
    (w) => w.id === store.activeWindow,
  );
  const template: MenuItemConstructorOptions[] = [
    {
      label: '+1',
      click: () => {
        addTab(
          {
            title: '来一个' + Date.now(),
            url: '',
          },
          store,
        );
      },
    },
    {
      label: '主播管理',
      click: () => {
        addTab(
          {
            title: '主播管理' + Date.now(),
            url: '#/mainData/anchorManage',
          },
          store,
        );
      },
    },
  ];
  if (activeWindow) {
    for (let v of activeWindow.viewList) {
      let label = v.title;
      if (v.id === activeWindow.activeView) {
        label = `[${label}-展示中]`;
      }

      template.push({
        label,
        click: () => {
          switchTab(v.id, store);
        },
      });
    }
  }

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
};
