import MDEditor from '@uiw/react-md-editor';

const MarkdownEditor = ({ value, onChange }) => {
  return (
    <div className="container" data-color-mode="light">
        <MDEditor value={value} onChange={onChange} />
        {/*<MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap' }} />*/}
    </div>
  )
};

export default MarkdownEditor;

