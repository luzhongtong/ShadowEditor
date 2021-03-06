import './css/HelpMenu.css';
import { MenuItem, MenuItemSeparator } from '../../third_party';
import RendererAttributesWindow from './window/RendererAttributesWindow.jsx';
import ThreeJsInformationWindow from './window/ThreeJsInformationWindow.jsx';

/**
 * 帮助菜单
 * @author tengge / https://github.com/tengge1
 */
class HelpMenu extends React.Component {
    constructor(props) {
        super(props);

        this.handleRendererAttributes = this.handleRendererAttributes.bind(this);
        this.handleThreeJsInformation = this.handleThreeJsInformation.bind(this);
        this.handleGitHubSource = this.handleGitHubSource.bind(this);
        this.handleGiteeSource = this.handleGiteeSource.bind(this);
        this.handleGitHubDocuments = this.handleGitHubDocuments.bind(this);
        this.handleGiteeDocuments = this.handleGiteeDocuments.bind(this);
        this.handleGitHubExamples = this.handleGitHubExamples.bind(this);
        this.handleGiteeExamples = this.handleGiteeExamples.bind(this);
        this.handleAbout = this.handleAbout.bind(this);
    }

    render() {
        return <MenuItem title={_t('Help')}>
            <MenuItem title={_t('Renderer Attributes')}
                onClick={this.handleRendererAttributes}
            />
            <MenuItem title={_t('Three.js Information')}
                onClick={this.handleThreeJsInformation}
            />
            <MenuItemSeparator />
            <MenuItem title={_t('Source')}>
                <MenuItem title={_t('GitHub')}
                    onClick={this.handleGitHubSource}
                />
                <MenuItem title={_t('Gitee')}
                    onClick={this.handleGiteeSource}
                />
            </MenuItem>
            <MenuItem title={_t('Documents')}>
                <MenuItem title={_t('GitHub')}
                    onClick={this.handleGitHubDocuments}
                />
                <MenuItem title={_t('Gitee')}
                    onClick={this.handleGiteeDocuments}
                />
            </MenuItem>
            <MenuItem title={_t('Examples')}>
                <MenuItem title={_t('GitHub')}
                    onClick={this.handleGitHubExamples}
                />
                <MenuItem title={_t('Gitee')}
                    onClick={this.handleGiteeExamples}
                />
            </MenuItem>
            <MenuItem title={_t('About')}
                onClick={this.handleAbout}
            />
        </MenuItem>;
    }

    handleRendererAttributes() {
        const win = app.createElement(RendererAttributesWindow);
        app.addElement(win);
    }

    handleThreeJsInformation() {
        const win = app.createElement(ThreeJsInformationWindow);
        app.addElement(win);
    }

    handleGitHubSource() {
        window.open('https://github.com/tengge1/ShadowEditor', '_blank');
    }

    handleGiteeSource() {
        window.open('https://gitee.com/tengge1/ShadowEditor', '_blank');
    }

    handleGitHubDocuments() {
        window.open('https://tengge1.github.io/ShadowEditor/', '_blank');
    }

    handleGiteeDocuments() {
        window.open('https://tengge1.gitee.io/shadoweditor/', '_blank');
    }

    handleGitHubExamples() {
        window.open('https://tengge1.github.io/ShadowEditor-examples/', '_blank');
    }

    handleGiteeExamples() {
        window.open('http://tengge1.gitee.io/shadoweditor-examples/', '_blank');
    }

    handleAbout() {
        app.alert({
            title: _t('About'),
            className: 'About',
            content: <>
                {_t('Name')}: ShadowEditor<br />
                {_t('Author')}: tengge1<br />
                {_t('Lisense')}: MIT<br />
                {_t('Source')}1: <a href="https://github.com/tengge1/ShadowEditor"
                    target="_blank"
                    rel="noopener noreferrer"
                                 >https://github.com/tengge1/ShadowEditor</a><br />
                {_t('Source')}2: <a href="https://gitee.com/tengge1/ShadowEditor"
                    target="_blank"
                    rel="noopener noreferrer"
                                 >https://gitee.com/tengge1/ShadowEditor</a><br />
            </>
        });
    }
}

export default HelpMenu;