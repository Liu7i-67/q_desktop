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
      label: '【新增Tab】',
      click: () => {
        addTab(
          {
            title: '新窗口',
            url: '',
          },
          store,
        );
      },
    },
    {
      label: '【新增主播管理】',
      click: () => {
        addTab(
          {
            title: '主播管理',
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
        label = `[=${label}=]`;
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
