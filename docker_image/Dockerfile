FROM ubuntu:latest

RUN apt-get update && \
    apt-get install -y \
        pandoc \
        texlive-latex-base \
        texlive-fonts-recommended \
        texlive-latex-extra \
        texlive-xetex \
        librsvg2-bin \
        imagemagick \
        git \
    && \
    rm -rf /var/lib/apt/lists/*


CMD ["/bin/bash"]