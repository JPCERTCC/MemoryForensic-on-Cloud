FROM alpine:latest

ENV LANG="C.UTF-8"
ENV LC_ALL="C.UTF-8"

RUN addgroup -S volg && \
    adduser -DG -S voluser -G volg -g "Unprivileged user,,,,"

RUN apk add --no-cache \
        capstone \
        dumb-init \
        git \
        zip \
        libfuzzy2-dev \
        binutils \
        libffi-dev \
        python3 && \
    apk add --no-cache --virtual=stage \
        gcc \
        musl-dev \
        curl \
        python3-dev

ENV PYTHONFAULTHANDLER="1"
ENV PYTHONHASHSEED="random"
ENV PYTHONUNBUFFERED="1"
ENV PYTHONUTF8="1"

RUN python3 -m ensurepip --default-pip && \
    python3 -m pip install --upgrade pip && \
    python3 -m pip install --no-cache --upgrade \
        wheel && \
    python3 -m pip install --no-cache --upgrade \
        pefile \
        yara-python \
        GitPython \
        pyimpfuzzy \
        ssdeep \
        pycryptodome

WORKDIR /usr/local/lib

RUN git clone --branch=develop --depth=1 --single-branch \
        https://github.com/volatilityfoundation/volatility3.git

WORKDIR /usr/local/lib/volatility3

RUN python3 setup.py install && \
    chmod 0755 \
        vol.py \
        volatility3/framework/symbols/windows/pdbconv.py && \
    for destination in "v3" "vol" "vol3" "volatility" "volatility3"; \
    do ln -sf \
        /usr/local/lib/volatility3/vol.py \
        /usr/local/bin/${destination}; \
    done

ENV PATH=/usr/local/bin:${PATH}

WORKDIR /tmp

RUN curl -sL https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub -o /etc/apk/keys/sgerrand.rsa.pub && \
    curl -sLO https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.33-r0/glibc-2.33-r0.apk && \
    curl -sLO https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.33-r0/glibc-bin-2.33-r0.apk && \
    apk add --no-cache glibc-2.33-r0.apk glibc-bin-2.33-r0.apk && \
    curl -sL https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip -o awscliv2.zip && \
    unzip awscliv2.zip && \
    ./aws/install && \
    rm -rf *.apk && \
    rm awscliv2.zip && \
    rm -rf aws

RUN git clone --branch=master --recursive --single-branch \
    https://github.com/JPCERTCC/impfuzzy.git \
    impfuzzy

RUN git clone --branch=main --recursive --single-branch \
    https://github.com/JPCERTCC/Windows-Symbol-Tables.git \
    symbols

RUN cp -R /tmp/symbols/symbols/windows /usr/local/lib/volatility3/volatility3/symbols && \
    rm -rf symbols

RUN apk --purge del \
       stage

WORKDIR "/usr/local/lib/volatility3/volatility3/symbols"

RUN find . -type d -exec chmod 0777 "{}" \; && \
    find . -type f -exec chmod 0666 "{}" \; && \
    find /usr/lib/python3* -type d -name symbols -exec chmod 0777 "{}" \;

WORKDIR /tmp

COPY run.sh /tmp

RUN chmod +x /tmp/run.sh

USER voluser

CMD /bin/sh
