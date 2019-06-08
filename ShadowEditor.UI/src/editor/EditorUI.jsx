import BorderLayout from '../layout/BorderLayout.jsx';

import EditorMenuBar from './menu/EditorMenuBar.jsx';
import EditorStatusBar from './status/EditorStatusBar.jsx';
import EToolbar from './EToolbar.jsx';
import EWorkspace from './EWorkspace.jsx';
import ESideBar from './ESideBar.jsx';

/**
 * 编辑器UI
 * @author tengge / https://github.com/tengge1
 */
class EditorUI extends React.Component {
    render() {
        return <BorderLayout>
            <EditorMenuBar region={'north'}></EditorMenuBar>
            <EditorStatusBar region={'south'}></EditorStatusBar>
            <EToolbar region={'west'}></EToolbar>
            <ESideBar region={'east'} split={true}></ESideBar>
            <EWorkspace region={'center'}></EWorkspace>
        </BorderLayout>;
    }
}

export default EditorUI;