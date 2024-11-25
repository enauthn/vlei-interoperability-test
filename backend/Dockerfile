FROM python:3.12-alpine as base-image

# Install dependencies required for keripy
RUN apk add --no-cache bash patch libsodium-dev linux-headers git gcc musl-dev rustup libffi-dev

# Install Rust for keripy
RUN rustup-init -y && source $HOME/.cargo/env
ENV PATH="/root/.cargo/bin:${PATH}"

# Upgrade pip
RUN python -m pip install --upgrade pip

# Clone keripy repository
ARG KERIPY_BRANCH=v1.1.21
RUN git clone --depth 1 --branch ${KERIPY_BRANCH} https://github.com/WebOfTrust/keripy.git /keripy

# Install keripy
WORKDIR /keripy
RUN pip install -r requirements.txt
RUN echo "GitHash(with commit message): " > .version && git --no-pager log --oneline -n1 >> .version && echo "Branch Name: provenant-dev/keripy/tree/${KERIPY_BRANCH}" >> .version
RUN rm -rf /keripy/.git

# Create and set the working directory for Node.js application
WORKDIR /usr/src/app

# Install Node.js
RUN apk add --no-cache nodejs npm

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Make sure the runscript-kli.sh has execute permissions
RUN chmod +x /usr/src/app/src/scripts/kli/establishment/initialize-GEDA-GIDA.sh

# Expose the port the app runs on
EXPOSE 3000

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV PYTHONIOENCODING=UTF-8
# Add this line to disable Python warnings
ENV PYTHONWARNINGS="ignore"

# Set the user to run the application
RUN addgroup --system --gid 1001 manager \
  && adduser --system --uid 1001 --disabled-password --shell /bin/false -G manager manager
USER manager

# Start the application
CMD ["npm", "start"]
