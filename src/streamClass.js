class StreamPicker{
  constructor(stdInStream, fileStream){
    this.stdInStream = stdInStream;
    this.fileStream = fileStream;
  }

  pick(filename){
    return filename ? this.fileStream(filename) : this.stdInStream();
  }
}

module.exports = StreamPicker;
