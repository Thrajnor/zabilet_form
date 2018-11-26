// Import React FilePond
import React from 'react';
import { FilePond, File } from 'react-filepond';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
// import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

// Register the plugins
// registerPlugin(FilePondPluginImagePreview);

// Our app
export default class filePond extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // Set initial files
      files: []
    };
  }

  render() {
    let errorText;
    let errorBorder;
    if (this.props.error) {
      errorText = 'invalid-text';
      errorBorder = 'invalid-border';
    } else if (!this.props.error) {
      errorText = 'valid-text';
      errorBorder = 'valid-border';
    }
    return (
      <div>
        {/* Pass FilePond properties as attributes */}
        <label className={errorText}>{this.props.label}</label>
        <FilePond
          // ref={ref => (this.pond = ref)}
          // server="/api"
          labelIdle='Przeciągnij i upuść swój plik lub <span class="filepond--label-action"> Wyszukaj </span>'
          labelFileWaitingForSize="Czekanie na wielkość pliku"
          labelFileSizeNotAvailable="Wielkość pliku niedostępna"
          labelFileLoading="Ładowanie"
          labelFileLoadError="Błąd podczas ładowania"
          labelFileProcessing="Wrzucanie"
          labelFileProcessingComplete="Wrzucanie zakończone"
          labelFileProcessingAborted="Wrzucanie przerwane"
          labelFileProcessingError="Błąd podczas wrzucania"
          labelTapToCancel="Kliknij by przerwać"
          labelTapToRetry="Kliknij by wznowić"
          labelTapToUndo="Kliknij by cofnąć"
          labelButtonRemoveItem="Usuń"
          labelButtonAbortItemLoad="Porzuć"
          labelButtonRetryItemLoad="Spróbuj ponownie"
          labelButtonAbortItemProcessing="Anuluj"
          labelButtonUndoItemProcessing="Cofnij"
          labelButtonRetryItemProcessing="Spróbuj ponownie"
          labelButtonProcessItem="Wrzuć"
          name={this.props.name}
          className={errorBorder}
          onupdatefiles={fileItems => {
            const files = fileItems.map(fileItem => fileItem.file);
            // Set current file objects to this.state
            this.props.setFieldValue(this.props.id, files, true);
            this.setState({
              files: files
            });
            this.props.setFieldTouched(this.props.id, true, true);
          }}
        >
          {/* Update current files  */}
          {this.state.files.map(file => (
            <File key={file} src={file} origin="local" />
          ))}
        </FilePond>
      </div>
    );
  }
}
